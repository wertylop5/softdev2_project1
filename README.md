# Terrific Teraffic

### Description

An interative map that can be used to view traffic related data in the US. 

### Sources:
* [2015 Urban Mobility Scorecard](https://mobility.tamu.edu/ums/)
  * This dataset contains all sorts of interesting traffic related information
* [TopoJSON of media markets](https://github.com/simzou/nielsen-dma/)
  * TopoJSON obtained from this repo

### Relevance/Significance

In the near future, all of us will need to commute to a job, possibly by car. As such, it is imperative for us to gauge the current traffic situation in various metro areas across the US. It will help to make an informed decision on whether or not to accept a job in a city known for congestion or based on trends (i.e. increasing amounts of traffic over the years).

### Data Set

We will utilize data from the 2015 Urban Mobility Scorecard, a study by INRIX and the Texas A&M Transportation Institute on the state of traffic congestion in various metropolitan areas. It includes information such as fuel wasted during rush hour and annual hours of delay caused by traffic.

To visualize this, we will use a seperate TopoJSON file that contains information on how to draw all the boundaries of media markets in the US. Although we couldn't find an easily parsable map that contained metropolitan areas, the boundaries of media markets often overlap with those of metro areas; as such, we viewed this as an adequate substitute.

According to the study some cities didn't have enough people and, as such, not all metro areas will have data. Note that the terms "media market" and "metro area" will be used interchangeably for the purposes of this project.

### Visualization and interaction

Our overall goal is a create an interactive heat map based on a specific data set. The website will initially show one data set, such as the Commuter Stress Index. A default year will be selected and the heatmap will display the data according to those parameters. A ranking bar will be placed on the side, so users can easily search for where a specific metro area stands.

The user can change what data set is displayed by clicking on buttons on the top of the page. When the button is hovered over, a brief explanation will be given as to what the data set is. A slider is located beneath the map to change the desired year. The heatmap will update to reflect these changes. Additionally, the ranking bar will be updated appropriately. When a user hovers over a media market, the info for that specific area in the specified year will be displayed to the side. 

### D3 Utilization

Each market on the map will be its own SVG element. This allows us to modify the color of the region with D3. D3 will also be used to update the info in the sidebar and the ranking bar.

