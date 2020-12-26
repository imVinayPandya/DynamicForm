import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://localhost:8080/graphql';

const graphql = (query, variables = {}) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {},
  });

  return graphQLClient.request(query, variables);
};

export const getForms = async () => {
  const query = gql`
    query GetForms {
      forms(orderBy: CREATED_AT_DESC) {
        nodes {
          formFields
          formName
          createdAt
          id
        }
      }
    }
  `;

  let {
    forms: { nodes: forms },
  } = await graphql(query);
  return forms;
};

export const getFormById = async (formId) => {
  const query = gql`
    query GetFormById($formId: UUID!) {
      form(id: $formId) {
        id
        formName
        formFields
        createdAt
      }
    }
  `;
  const variables = {
    formId: formId,
  };
  let { form } = await graphql(query, variables);
  return form;
};

export const addNewForm = async (formName, formFields) => {
  const query = gql`
    mutation CreateNewForm($body: CreateFormInput!) {
      createForm(input: $body) {
        form {
          id
          formName
          formFields
          createdAt
        }
      }
    }
  `;

  const variables = {
    body: {
      form: {
        formName: formName,
        formFields: formFields,
      },
    },
  };

  const {
    createForm: { form },
  } = await graphql(query, variables);
  return form;
};

export default graphql;
