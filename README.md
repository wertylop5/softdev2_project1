# Terrific Teraffic

### Description

An interative map that can be used to view traffic related data in the US. 

### Source:
* [2015 Urban Mobility Scorecard](https://mobility.tamu.edu/ums/)
  * This dataset contains all sorts of interesting traffic related information

### Relevance/Significance

In the near future, all of us will need to commute to a job, possibly by car. As such, it is imperative for us to gauge the current traffic situation in various metro areas across the US. It will help to make an informed decision on whether or not to accept a job in a city known for congestion or based on trends (i.e. increasing amounts of traffic over the years).

### Interaction

We will use a map of media markets in the US, of which are commonly used to denote metro areas, to create an interactive heat map for our data. This will be accomplished by overlaying an SVG element with borders drawn over a map of the US. A slider will be provided below the map to adjust the current year being displayed. Additionally, the type of data being viewed can be selected with buttons. A ranking of the cities will be provided on the side.

### D3 Utilization

Each market on the map will be its own div or svg element - this allows us to modify the color of the region with D3. We also plan on having a sidebar showing a ranking of different cities; each textbox will be contained in a div that can be moved around with D3 to manipulate each city's position. Transitions can be used to visualize the magnitude in which a city's ranking will change in the list.
