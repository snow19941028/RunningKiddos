export default function showTitle (param) {
  if(param === "class "){    
    return <div> Class </div>
  }
  if(param === "qrcode "){
    
    return <div> Qrcode</div>
  }
  if(param === "config "){
    
    return <div> Config </div>
  }
  if(param === "stats "){
    
    return <div> Stats </div>
  }
  if(param === "report "){
    
    return <div> Report </div>
  }
  return null;
}