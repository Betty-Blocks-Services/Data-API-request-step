# Data-API-request-step docs

With this Action function you can define which data (properties, relations and their properties etc., or the total count of a collection) you want to retrieve in your Betty Blocks actions. This offers more flexibility when using other steps with using relations for example in generating email and PDF templates.

Eventually this step generates a Data API call, so it's necessary to have a basic knowledge about Data API queries (see: https://docs.bettyblocks.com/en/articles/5598057-data-api-queries)

> **Note**
> This Action function is best used together with steps that can read text since only a single text variable is returned as output.

## How to use

1.  Select a model based as "startingpoint".

2.  Select a type which defines if you want to retrieve a record (one item), or a collection of records (multiple items).

    ![](https://raw.githubusercontent.com/Betty-Services/Data-API-request-step/main/images/type.png)

3.  Define your filter (in Data API/GraphQL syntax) and variables which you want to use based on the selected model. Variables can be exposed with curly braces in the filter option. Make sure to always use spaces in the filter objects itself, else these will conflict with the curly braces.

    For example:

    ![Filter and variables](https://raw.githubusercontent.com/Betty-Services/Data-API-request-step/main/images/filter_variables.png)

4.  Define your query by starting directly with the (relational) properties of the selected model in step 1. Please make sure to use the Data API name format when querying relations or properties with underscores in the database name (which will result in the database name in camelCase without underscores).

    > **Tip:** Use the Betty Blocks Playground to verify the correct syntax of your query. The URL of the Playground of your app is as follows: https://[APPLICATION_IDENTIFIER].betty.app/api/runtime/[APPLICATION_UUID].

    For example:

        id
        name
        value
        propertyName
        hasManyRelation {
            id
            name
        }
        belongsToRelation {
            id
            name
        }

5.  Define the output type. By default this option is set to query the results body you have defined in step 4, however you are able to get the total count of a certain collection as well. This can be useful when you need to loop through a collection larger than 200 records and/or want to process data in batches.

    > **Note**
    > This option is only relevant when querying a collection of records.


6.  Choose a variable name for the result which can be used in subsequent steps. As described previously the output is always a text variable. However the output can be parsed to other data types with for example the Liquid or Expression step.
