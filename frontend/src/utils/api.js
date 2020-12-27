import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://localhost:8080/graphql';

const graphql = (query, variables = {}) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {},
  });

  return graphQLClient.request(query, variables);
};

export default graphql;

////////////////////////////////////
//
//  Forms Api
//
////////////////////////////////////

export const getForms = async () => {
  const query = gql`
    query GetForms {
      forms(orderBy: CREATED_AT_DESC) {
        nodes {
          id
          formName
          formFields
          createdAt
          formResponses {
            totalCount
          }
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
          formResponses {
            totalCount
          }
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

////////////////////////////////////
//
//  Forms Response Api
//
////////////////////////////////////

export const addFormResponse = async (formId, answers) => {
  const query = gql`
    mutation CreateFormResponse($body: CreateFormResponseInput!) {
      createFormResponse(input: $body) {
        formResponse {
          id
          formId
          answers
          createdAt
        }
      }
    }
  `;

  const variables = {
    body: {
      formResponse: {
        formId,
        answers,
      },
    },
  };

  const {
    createFormResponse: { formResponse },
  } = await graphql(query, variables);
  return formResponse;
};
