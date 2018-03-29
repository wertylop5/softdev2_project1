# softdev2_project1

Description of data set(s).

We have a table which has, for 32 years, various traffic data, such as number of commuters, population, and cost of commute for every area listed in the neilson media market map. Along with this, We have a layer of the map we could put over an image of it for interactivity. 

Source:
Stanley put the source here

Relevance/Significance

As many stuy students know, commuting is a major pain. Many of us have a 2 hour commute every day. This is why traffic data is so important - with those 2 hours, how much productivity do we lose? how much do we spend? How much ime does rush hour add onto the commute? looking at traffic data over the years can help us see not only the value of commutes, but also how they hvae changed over a 32 year period and what kind of effect it has overall.

To make the data come alive, we have 3 things - The first is an interactive map whic hallows you to hover over each media market and see the breakdown of traffic data for that area. The map itself will look liek a heatmap depending on what data you have sleected to be shown. The second thing is a slider which lets you change the year you are seeing. The third thing is buttons which allow you to change what data you are seeing.

We will be using d3 data in a very specefic way. Each market on the map will be its own div or svg element or something simaler - we can select all of them and use this to know what data to put in each element. This will allow us to change what data is being represented easily by having each area essentially be "named" something different and therefore be able to have their own unique data sets for the various categories. 
