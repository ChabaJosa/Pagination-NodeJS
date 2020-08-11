# About this App
This is a NodeJS/Express App with a MongoDB that uses pagination with the created API to query data.<br/>

My approach to this solution, since I had never encountered pagination before, was to go through some tutorials 
to get a general idea and desired outcome. Then, once  I had very basic pagination set-up, I started working 
on connecting to the Mongo Cluster and re-organizing the files so that schemas and routes were separate from the server.js file.<br/>

Finally, to implement pagination in the mainRoute I used a helper function as middleware which does all of the filtering. There's a lot of conditionals going around in this file along with some proper try/catch statements. Some of the JS methods I used to filter the raw data were slice(), sort(), and reverse(). I also implemented the use of regular expressions.



## Instructions

To interact with this API read the following steps:

##### Step #1:

Follow this https://pagination-backend.herokuapp.com/apps/ which should lead you to a default result of 50 apps.<br/>
Now play around by changing the following highlighted params and query options! <br/>

https://pagination-backend.herokuapp.com/apps/` name/id `?start=` 1/my-app-001 `1&end=` 50/my-app-050 `&max=` 10 `&` asc/desc `

###### Sample Query: 
Sample Query: https://pagination-backend.herokuapp.com/apps/name?start=my-app-001&end=my-app-050&max=10&order=desc

###### Note: 
In both `start`, `end` and `max` options, any number from 1 to 99 is available since this is how many users we have in our DB. <br/>
Also, all params are optional except `name/id`.<br/>


















