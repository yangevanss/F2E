(async function(){
  const container = document.querySelector('.side_nav_container')
  const returnBtn = document.querySelector('.return_position')
  const searchInput = document.getElementById('searchInput')
  const searchBtn = document.getElementById('search')
  const options = [...document.querySelectorAll('.side_nav_option li')]
  let [latitude, longitude] = await getPosition()
  let infoData = await getMaskInfo()
  const map = L.map('map').setView([latitude, longitude], 16).on('dragend', dragendHandler);
  const userIcon = L.icon({
    iconUrl: './img/dot.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
  })
  L.marker([latitude, longitude], {icon: userIcon}).addTo(map);
  let markers = [], markerGroup, locationInfo = {data: []}, sideInfo, range, maskType
  const locationInfoProxy = new Proxy(locationInfo, {
    get(target, key){
      return target[key]
    },
    set(target, key, val){
      target[key] = val
      getSildInfo(target[key])
      getMarkers(target[key])
      return true
    }
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  returnBtn.addEventListener('click', resetPosition)
  searchInput.addEventListener('keydown', searchCustomStore)
  searchBtn.addEventListener('click', searchCustomStore)
  const optionMap = {
    distance: optionDistance,
    storeStatus: optionStoreStatus,
    maskType: optionMaskType
  }
  const optionStatus = options.reduce((prev, dom) => {
    let type = dom.parentNode.dataset.type
    if(!prev[type]) prev[type] = []
    prev[type].push(false)
    dom.addEventListener('click', setOptions)
    return prev
  }, {})
  const optionProxyHandler = {
    get(target, key){
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], optionProxyHandler)
      } else {
        return target[key];
      }
    },
    set(target, key, {status, dom}){
      target[key] = status
      if(status){
        let type = dom.parentNode.dataset.type
        dom.classList.add('active')
        optionMap[type](dom.dataset.option)
        getAroundStore(infoData)
      }else {
        dom.classList.remove('active')
      }
    }
  }
  const optionProxy = new Proxy(optionStatus, optionProxyHandler)
  function setOptions(){
    let type = this.parentNode ? this.parentNode.dataset.type : 'distance'
    let dom = [...document.querySelectorAll(`[data-type='${type}'] > li`)]
    let index = dom.indexOf(this) === -1 ? 0 : dom.indexOf(this)
    for(let i in optionProxy[type])optionProxy[type][i] = {status: false, dom: dom[i]}
    optionProxy[type][index] = {status: true, dom: dom[index]}
  }
  function optionDistance(info){range = info}
  function optionStoreStatus(info){}
  function optionMaskType(info){maskType = info}
  function getPosition(){
    return new Promise(resolve=>{
      navigator.geolocation.getCurrentPosition(position => {
        resolve([position.coords.latitude, position.coords.longitude])
      });
    })
  }
  function getMaskInfo(){
    return new Promise(resolve=>{
      fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
        .then(res=>res.json())
        .then(json=>resolve(json.features))
        .catch(err=>console.log(err))
    })
  }
  function getSildInfo(maskInfo){
    sideInfo = document.querySelectorAll('.side_nav_info')
    if(sideInfo.length){
      sideInfo.forEach(child => container.removeChild(child))
    }
    maskInfo.sort(({geometry: {coordinates: a}}, {geometry: {coordinates: b}})=>{
      return getDistance(latitude, longitude, a[1], a[0]) - getDistance(latitude, longitude, b[1], b[0])
    }).forEach(({properties, geometry: {coordinates}})=>{
      let distance = getDistance(latitude, longitude, coordinates[1], coordinates[0])
      let div = document.createElement('div')
      div.className = 'side_nav_info'
      div.innerHTML = `
      <div class="info_title">
        <h2>${properties.name}</h2>
        <p>營業中 | ${distance >= 1 ? distance.toFixed(1) + 'km' : (distance * 1000 >>0) + 'm'}</p>
      </div>
      <div class="info">
        <img src="./img/place-24px.svg" alt="place">
        <p>${properties.address}</p>
      </div>
      <div class="info">
        <img src="./img/local_phone-24px.svg" alt="phone">
        <p>${properties.phone}</p>
      </div>
      <div class="info">
        <img src="./img/access_time-24px.svg" alt="time">
        <p>${properties.note ? properties.note : '暫無資料'}</p>
      </div>
      <div class="mask_status">
        <div class="adult ${properties.mask_adult ? '' : 'no_mask'}">成人口罩 : <span>${properties.mask_adult}</span></div>
        <div class="child ${properties.mask_child ? '' : 'no_mask'}">兒童口罩 : <span>${properties.mask_child}</span></div>
      </div>
      `
      container.appendChild(div)
      sideInfo = [...document.querySelectorAll('.side_nav_info')]
      sideInfo.forEach(dom => dom.addEventListener('click', getStore))
    })
  }
  function getMarkers(maskInfo){
    markers = []
    maskInfo.forEach(({properties, geometry: {coordinates}})=>{
      markers.push(L.marker([coordinates[1], coordinates[0]])
      .bindPopup(`
        <h2>${properties.name}</h2>
        <p>${properties.address}</p>
        <p>營業時間 | ${properties.note ? properties.note : '暫無資料'}</p>
        <p>電話 | ${properties.phone}</p>
        <div class='mask_status'>
          <div class="adult ${properties.mask_adult ? '' : 'no_mask'}">成人口罩 : <span>${properties.mask_adult}</span></div>
          <div class="child ${properties.mask_child ? '' : 'no_mask'}">兒童口罩 : <span>${properties.mask_child}</span></div>
        </div>
        <p>最後更新 | ${properties.updated ? properties.updated : '暫無資料'}</p>
      `, {
        className: 'marker',
        autoPan: false
      }))
    })
    if(markerGroup)markerGroup.clearLayers()
    markerGroup = L.layerGroup(markers).addTo(map);
  }
  function getStore(){
    if(!markers[sideInfo.indexOf(this)].isPopupOpen()){
      let marker = markers[sideInfo.indexOf(this)]
      map.panTo([marker._latlng.lat, marker._latlng.lng], 16)
      marker.openPopup()
    }
  }
  function getDistance(lat1, lng1, lat2, lng2){
    return 2 * 6378.137 * Math.asin(Math.sqrt(Math.pow(Math.sin(Math.PI * (lat1-lat2)/360), 2)+Math.cos(Math.PI * lat1/180) * Math.cos(Math.PI * lat2/180)*Math.pow(Math.sin(Math.PI*(lng1-lng2)/360), 2)))
  }
  function getAroundStore(info){
    locationInfoProxy.data = filterStoreStatus(filterMaskType(filterRangeStore(info))).filter((info, index) => index < 200)
  }
  function searchCustomStore(e){
    if(e.keyCode === 13 || e.type === "click"){
      let value = searchInput.value.trim()
      if(value){
        setOptions()
        locationInfoProxy.data = filterMaskType(infoData).filter(({properties: {address, name}}) => {
          return address.indexOf(value) !== -1 || name.indexOf(value) !== -1
        })
        let location = locationInfoProxy.data[0].geometry.coordinates
        map.panTo([location[1], location[0]], 16)
      }    
    }
  }
  function filterRangeStore(info){
    return info.filter(({geometry: {coordinates}})=>{
      if(range){
        return getDistance(latitude, longitude, coordinates[1], coordinates[0]) < range
      }else {
        let bounds = {
          W: map.getBounds().getNorthWest().lng,
          E: map.getBounds().getNorthEast().lng,
          N: map.getBounds().getNorthWest().lat,
          S: map.getBounds().getSouthEast().lat
        }
        return (coordinates[0] < bounds.E && coordinates[0] > bounds.W)
        && (coordinates[1] < bounds.N && coordinates[1] > bounds.S)
      }
    })
  }
  function filterMaskType(info){
    return info.filter( info => maskType ? info.properties[maskType] !== 0 : info)
  }
  function filterStoreStatus(info){
    return info.filter( info => {
      return info
    })
  }
  function resetPosition(){
    searchInput.value = ''
    map.panTo([latitude, longitude], 16)
    getAroundStore(infoData)
  }
  function dragendHandler(){
    getAroundStore(infoData)
  }
  getAroundStore(infoData)
})()