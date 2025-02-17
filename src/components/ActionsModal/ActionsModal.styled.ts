import styled from 'styled-components';
import { Button } from 'components/primitives/Button';
import { ContainerText } from 'components/primitives/Layout/Text';

export const EditorWrapper = styled.div`
  margin: 1.25rem;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const SectionWrapper = styled.div`
  margin: 1.5rem;
`;

export const ActionsButton = styled(Button).attrs(() => ({
  variant: 'secondary',
}))<{ vertical?: boolean }>`
  background-color: transparent;
  padding: ${({ vertical }) => (vertical ? '1rem' : '0.75rem 1rem')};
  width: 100%;
  display: flex;
  align-items: ${({ vertical }) => (vertical ? 'flex-start' : 'center')};
  justify-content: space-between;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  border-radius: ${({ vertical }) => (vertical ? '0.625rem' : '2rem')};
  &:active,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.text};
  }
`;

export const SectionTitle = styled(ContainerText).attrs(() => ({
  variant: 'bold',
}))`
  display: block;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
`;

export const ButtonLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonDetail = styled(ContainerText).attrs(() => ({
  variant: 'medium',
}))<{ vertical?: boolean }>`
  margin: ${({ vertical }) => (vertical ? '0.5rem 0 0 0' : '0')};
  color: ${({ theme }) => theme.colors.grey};
`;

export const FormElement = styled.div`
  margin: 1.5rem;
`;

export const FormLabel = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.75rem;
`;

export const FormError = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.label};
  margin-top: 0.5rem;
`;
