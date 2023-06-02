# Data-API-request-step docs

With this Action function you can define which data (properties, relations and their properties etc.) you want to retrieve in your Betty Blocks actions. This offers more flexibility when using other steps with using relations for example in generating email and PDF templates.

Eventually this step generates a Data API call which can be used, so it's necessary to have a basic knowledge about Data API queries (see: https://docs.bettyblocks.com/en/articles/5598057-data-api-queries)

*Note: this action function is only usable to implement together with steps which can read text since only 1 text variables is used as output.*

## How to use
1. Select a model based as "startingpoint".

2. Select a type which defines of you want to retrieve a record (one item), or multiple items (collection).
![](https://raw.githubusercontent.com/Betty-Services/Data-API-request-step/main/images/type.png)

3. Define your filter Data API syntax and variables which you want to use based on your selected model . Variables can be exposed with curly braces in the filter option. Make sure to always use spaces in your filter objects itself, else these will conflict with the curly braces. 
For example:
![Filter and variables](https://raw.githubusercontent.com/Betty-Services/Data-API-request-step/main/images/filter_variables.png)

4. Define your query by starting directly with the properties of the selected model in step 1. When using relations please make sure to use the Data API variant (which is the related model's database name in camelCase)
For example: 

    id
    name
    value
    hasManyRelation {
    id
    name
}
belongsToRelation {
id 
name
}

5. Select a result variable name which can be selected in other steps. As described previously the output is always a text variable. However the output can be used/selected in other steps which support text variables as input like the Liquid or Expression step.
