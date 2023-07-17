import templayed from "../../utils/templayed";

const dataApiRequest = async ({
  type,
  queryData,
  filter,
  filterVariables,
  model: { name: modelName },
  outputType,
}) => {
  const variableMap = filterVariables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const queryName = type === "record" ? `one${modelName}` : `all${modelName}`;
  const queryBody =
    type === "record"
      ? queryData
      : outputType === "results"
      ? `results { ${queryData} }`
      : "totalCount";

  const where = `{ ${templayed(filter || "")(variableMap)} }`;
  const query = `
    query {
      ${queryName}(where: ${where}) {
        ${queryBody}
      }
    }
  `;

  const { data, errors } = await gql(query);

  if (errors) {
    console.log(errors);
  }

  return {
    result: type === "record" ? data[queryName] : data[queryName][outputType],
  };
};

export default dataApiRequest;
