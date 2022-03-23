import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-maps-user-location',
  templateUrl: './maps-user-location.component.html',
  styles: [
    `
      #maps-container {
        background-color: #c7c7c7;
        height: 100%;
      }
      .my-map-search-field{
        margin-top: 16px;
        border: 1px solid transparent;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 32px;
        width: 30%;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

    `]
})
export class MapsUserLocationComponent implements OnInit, AfterViewInit, OnDestroy {

  markers: any = [];
  infoContent = ''
  logInfo: any = ''
  listingPlace: any = '';
  addressName: any = '';
  CurrentPosition!: GeolocationPosition;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap
  @ViewChild('mapSearchField') searchField!: ElementRef
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow

  zoom = 12
  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(
    private http: HttpClient
  ) {
  }


  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.CurrentPosition = position
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      // here we do Reverse Geocoding technique that convert Latitude and // longtitude to be lovely human readable information like address
      this.getProductAddressMap(position).subscribe((data: any) => {
        console.log('-------------', data)
        this.listingPlace =
// doing traverse from json response that we get from //getProductAddressMap() below
        data.results[6].address_components[0].short_name;
      })
    })


  }

  ngAfterViewInit(){

    const searchBox = new google.maps.places.SearchBox(this.searchField.nativeElement);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    )

    searchBox.addListener('places_changed',() =>{
      const places = searchBox.getPlaces()
      if (places.length === 0){
        return
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place =>{
        if (!place.geometry || !place.geometry.location){
          return
        }
        if (place.geometry.viewport){
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      });
      this.map.fitBounds(bounds)
    })

  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event)
  }

  getProductAddressMap(location: GeolocationPosition): Observable<any>{
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${environment.GOOGLE_API_KEY}`);
  }




  zoomIn() {
    // @ts-ignore
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    // @ts-ignore
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  logCenter() {
    this.logInfo = this.map.getCenter()
    const location = JSON.stringify(this.logInfo)

    console.log(JSON.stringify(this.logInfo))
    console.log('--------maps-------------',this.map)
  }



  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: any, content: any) {
    this.infoContent = content
    this.info.open(marker.marker)
  }
  ngOnDestroy(): void {
    this.logInfo = ''
  }
}
