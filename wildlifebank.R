library(maps)
library(leaflet)
library(dplyr)
library(shiny)
library(jsonlite)


data <- fromJSON('https://sheetdb.io/api/v1/njkydkxgeu6m3')
head(data)

df <- as.data.frame(data)
class(df)
head(df)

df<- transform(df,Longitude = as.numeric(lng),Latitude = as.numeric(lat))

map <- leaflet(df)



tiger_icon <- makeIcon(
  
  iconUrl = "D:/wildlife/tiger.png",
  iconWidth = 30 ,
  iconHeight = 30,
  iconAnchorX = 30,
  iconAnchorY = 30
)


elephant_icon <- makeIcon(
  
  iconUrl = "D:/wildlife/elephant.png",
  iconWidth = 30 ,
  iconHeight = 30,
  iconAnchorX = 30,
  iconAnchorY = 30
)

lion_icon <- makeIcon(
  
  iconUrl = "D:/wildlife/Asiatic Lion.png",
  iconWidth = 30 ,
  iconHeight = 30,
  iconAnchorX = 30,
  iconAnchorY = 30
)

bearicon <- makeIcon(
  
  iconUrl = "D:/wildlife/bear.jpeg",
  iconWidth = 30 ,
  iconHeight = 30,
  iconAnchorX = 30,
  iconAnchorY = 30
)
# Define UI for Shiny app
ui <- fluidPage(
  titlePanel("Wildlife Locations"),
  sidebarLayout(
    sidebarPanel(
      checkboxGroupInput("animals", "Select animals:", choices = unique(df$animal))
    ),
    mainPanel(
      leafletOutput("map")
    )
  )
)
# Define server function for Shiny app
server <- function(input, output) {
  output$map <- renderLeaflet({
    # Create leaflet map object
    map <- leaflet(df) %>% addTiles() %>% setView(lng = 77.9629, lat = 12.5937, zoom = 12)
    
    #filter data based on selected animal
    df_selected <- df%>% filter(animal%in% input$animals)%>%
      mutate(Longitude=as.numeric(Longitude), Latitude=as.numeric(Latitude))
    
    # Add markers with custom icons based on selected animal
    for(animal in input$animals){
      if (animal == "tiger") {
        df_temp <- df %>% 
          filter(animal == "tiger")
        map <- map %>%  addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_selected %>% filter(animal=="tiger"), lng = ~Longitude, lat = ~Latitude, icon = tiger_icon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "Longitude: ", df_temp$lng, "<br>",  "<br>"))
      } else if (animal == "TIGER") {
        df_temp <- df %>% 
          filter(animal == "TIGER") 
          map <- map %>% addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_temp, lng = ~Longitude, lat = ~Latitude, icon = tiger_icon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "Longitude: ", df_temp$lng, "<br>",  "<br>"))
      } else if (animal == "lion") {
        df_temp <- df %>% 
          filter(animal == "lion") 
        map <- map %>% addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_temp, lng = ~Longitude, lat = ~Latitude, icon = lion_icon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "Longitude: ", df_temp$lng, "<br>",  "<br>"))
      } else if (animal == "LION") {
        df_temp <- df %>% 
          filter(animal == "LION") 
        map <- map %>% addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_temp, lng = ~Longitude, lat = ~Latitude, icon = lion_icon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "Longitude: ", df_temp$lng, "<br>", "Pincode: ", df_temp$Pincode, "<br>", "State: ", df_temp$State, "<br>", "Category: ", df_temp$Category, "<br>"))
      } else if (animal == "bear") {
        df_temp <- df %>% 
          filter(animal == "bear") 
        map <- map %>% addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_temp, lng = ~Longitude, lat = ~Latitude, icon = bearicon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "Longitude: ", df_temp$lng, "<br>", "Pincode: ", df_temp$Pincode, "<br>", "State: ", df_temp$State, "<br>", "Category: ", df_temp$Category, "<br>"))
      } else if (animal == "elephant") {
        df_temp <- df %>% 
          filter(animal == "elephant") 
        map <- map %>% addProviderTiles(providers$Esri.WorldStreetMap) %>% addMarkers(data=df_temp, lng = ~Longitude, lat = ~Latitude, icon = elephant_icon, popup = paste("animal: ", df_temp$animal, "<br>", "latitude: ", df_temp$lat, "<br>", "longitude: ", df_temp$lng, "<br>", "Pincode: ", df_temp$Pincode, "<br>", "State: ", df_temp$State, "<br>", "Category: ", df_temp$Category, "<br>"))
      }}
    
    
    map
  })
}

# Run Shiny app
shinyApp(ui = ui, server = server)
