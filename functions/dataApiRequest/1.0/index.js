import templayed from "../../utils/templayed";

const dataApiRequest = async ({
  type,
  query,
  filter,
  filterVariables,
  model: { name },
}) => {
  const variableMap = filterVariables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const queryFilter =
    filter !== "" && filter !== null
      ? `(where: {${templayed(filter)(variableMap)}})`
      : ``;

  const queryTypeName = type === "record" ? `one${name}` : `all${name}`;

  const oneQuery = `
  query {
    ${queryTypeName}${queryFilter} {
    ${query}
    }
  }
`;

  const allQuery = `
query {
    ${queryTypeName}${queryFilter} {
    results {
        ${query}
    }
  }
}
`;

  const finalQuery = type === "record" ? oneQuery : allQuery;

  const { data, errors } = await gql(finalQuery);

  if (errors) {
    console.log(errors);
  }

  {
    return {
      result:
        type === "record" ? data[queryTypeName] : data[queryTypeName].results,
    };
  }
};
export default dataApiRequest;
