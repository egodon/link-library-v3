import React from 'react';
import styled from 'styled-components';
import { Trash2, ExternalLink, Edit, Copy } from 'react-feather';
import Highlighter from 'react-highlight-words';
import Skeleton from '@material-ui/lab/Skeleton';
import { lighten } from 'polished';
import { Link as ILink } from 'interfaces';
import {
  useModalContext,
  useLinksContext,
  useSnackbarContext,
  useAuthContext,
} from 'context/index';
import DeleteLinkModal from 'components/modals/DeleteLinkModal';
import CategoryPill from './CategoryPill';
import { CATEGORIES } from 'constants/index';
import LinkModal from 'components/modals/LinkModal';
import DesktopOnly from 'components/layout/DesktopOnly';
import { media } from 'css/variables';

type Props = {
  link: ILink;
  displayMode?: boolean;
  loading?: boolean;
};

const Link: React.FC<Props> = ({ link, displayMode, loading }) => {
  const { toggleModal } = useModalContext();
  const { searchQuery } = useLinksContext();
  const { openSnackbar } = useSnackbarContext();
  const { user } = useAuthContext();

  function handleCopy() {
    navigator.clipboard.writeText(link.url);
    openSnackbar({ variant: 'success', message: 'Link copied to clipboard' });
  }

  function handleUpdate() {
    toggleModal(() => () => <LinkModal hydratedState={link} />);
  }

  function handleDelete() {
    toggleModal(() => () => <DeleteLinkModal link={link} />);
  }

  const categoryData = CATEGORIES[link.category] || {};

  if (loading) {
    return (
      <Container data-testid="link">
        <Content>
          <TextContainer>
            <Skeleton variant="text" height={14} />
            <Skeleton variant="text" height={11} width="21rem" />
            <Skeleton variant="text" height={9} width="18rem" />
          </TextContainer>
          <Skeleton variant="rect" height="11rem" />
        </Content>
      </Container>
    );
  }

  return (
    <Container data-testid="link">
      <Content>
        <TextContainer>
          <Header>
            <Title bgColor={categoryData.color}>
              {searchQuery ? (
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={[searchQuery]}
                  textToHighlight={link.title}
                />
              ) : (
                link.title
              )}
            </Title>
            <CategoryPill category={link.category} />
          </Header>
          <Description>{link.description}</Description>
          <Url href={link.url} target="_blank" rel="nooponer">
            {link.favicon && <Favicon src={link.favicon} />}
            <span>{link.url}</span>
            <ExternalLink size={16} />
          </Url>
        </TextContainer>
        <DesktopOnly>
          <Image src={link.image} />
        </DesktopOnly>
        {!displayMode && user && (
          <OptionsContainer>
            <CopyLink onClick={handleCopy}>
              <Copy />
            </CopyLink>
            <UpdateLink onClick={handleUpdate}>
              <Edit />
            </UpdateLink>
            <DeleteLink onClick={handleDelete}>
              <Trash2 className="Trash-icon" />
            </DeleteLink>
          </OptionsContainer>
        )}
      </Content>
    </Container>
  );
};

const OptionsContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  background-color: var(--white);
  color: var(--grey-200);
  border-left: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.1s ease;
  border-bottom-left-radius: 3px;
  display: flex;
  align-items: center;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    position: relative;
  }

  span + span {
    border-left: 1px solid var(--grey-200);
  }
`;

const Container = styled.li`
  position: relative;
  max-width: var(--link-max-width);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.8rem;
  background: #fafafa;

  &:hover ${OptionsContainer} {
    opacity: 1;
  }

  ${media.mobile`
    max-width: auto;
  `}
`;

const Option = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem;
  cursor: pointer;
  color: var(--grey-400);

  &:hover {
    color: var(--grey-500);
  }
`;

const CopyLink = styled(Option)``;

const UpdateLink = styled(Option)``;

const DeleteLink = styled(Option)`
  &:hover {
    color: var(--danger-red);
  }
`;

const Content = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: minmax(39rem, 1fr) 20rem;
  align-items: center;
  overflow: hidden;
  color: var(--grey-400);

  ${media.mobile`
    display: block;
  `}
`;

const TextContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h5<{ bgColor?: string }>`
  font-size: var(--fs-default);
  margin-bottom: 0.4rem;
  color: var(--grey-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .highlight {
    background-color: ${({ bgColor }) =>
      bgColor ? lighten(0.35, bgColor) : 'none'};
    padding: 2px 0;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--grey-400);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1;
  max-height: 2.6rem;
`;

const Favicon = styled.img<{ src: string }>`
  --size: 14px;
  height: var(--size);
  width: var(--size);
  margin-right: 0.8rem;
`;

const Url = styled.a`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: var(--grey-400);

  span {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    position: relative;
    bottom: 2px;
    margin-left: 0.4rem;
    opacity: 0;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Image = styled.div<{ src: string | undefined }>`
  max-width: 100%;
  min-width: 100%;
  height: 11rem;
  background-image: url(${(p) => p.src});
  background-size: cover;
`;

export default Link;
