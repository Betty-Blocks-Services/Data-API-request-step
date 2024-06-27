import templayed from "../../utils/templayed";

const mapFilterVars = (variables) => {
  return variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});
};


const createQuery = (model, queryData, outputType, where) => {
  const queryName = `all${model}`;
  const queryBody = outputType === "results" ? `results { ${queryData} }` : "totalCount";

  return `
    query($where: ${model}FilterInput, $skip: Int, $take: Int) {
      ${queryName}(where: ${where}, skip: $skip, take: $take) {
        ${queryBody}
      }
    }
  `;
};

const fetchData = async (query, skip, take) => {
  const { data, error } = await gql(query, {
    skip,
    take,
  });
  if (error) {
    console.error(error);
  }

  return data;

}


const dataApiRequest = async ({
  type,
  queryData,
  filter,
  filterVariables,
  skipInput = 0,
  takeInput = 200,
  model: { name: modelName },
  outputType,
  recursive,
}) => {
  const variableMap = mapFilterVars(filterVariables)
  const queryName = type === "record" ? `one${modelName}` : `all${modelName}`;
  const where = `{ ${templayed(filter || "")(variableMap)} }`;
  const query = createQuery(modelName, queryData, outputType, where);
  const skip = Number(skipInput);
  const take = Math.max(1, Number(takeInput));

  let data;
  if (recursive) {
    if (type !== "collection") throw new Error("Recursive queries are only supported for collections");

    let recordsLeft = true;
    let currentSkip = skip;

    while (recordsLeft) {
      const result = await fetchData(query, currentSkip, take);
      const records = result[queryName][outputType];
      data = data ? data.concat(records) : records;
      currentSkip = skip + take;

      const remainingRecords = await fetchData(query, currentSkip, 1);

      recordsLeft = remainingRecords[queryName][outputType].length > 0;
    }

  } else {
    const result = await fetchData(query, skip, take);
    const records = type === "record" ? result[queryName] : result[queryName][outputType];
    data = records;
  }

  return {
    result: data
  };
};

export default dataApiRequest;