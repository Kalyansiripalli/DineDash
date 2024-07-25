const useFilterOnSerch=(searchText,listOfResturantsFromAPI)=>{
    return listOfResturantsFromAPI.filter((res)=>res.name.toLowerCase().includes(searchText.toLowerCase())) 
}

export default useFilterOnSerch;