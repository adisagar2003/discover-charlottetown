
function LocationMapComponent({category, text}: {text: string, category: string}) {
  return (
    <div className='locationMapComponent'>
        <div className='locationMapComponent-container'>
            <span>{text}</span>
            <span>{category}</span>
        </div>
    </div>
  )
}

export default LocationMapComponent