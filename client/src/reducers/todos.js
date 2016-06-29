const todos = (state = [{id:1, content:'Todo 1'}, {id:2, content:'Todo 2'}], action) => {
	switch (action.type) {
		case 'ADD_TODO': 
		return [
	        {id:3 , content:'Todo 3'},
	        ...state
	    ]
		default: return state;
	}
}
export default todos;