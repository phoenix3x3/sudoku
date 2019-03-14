    
module.exports = function solveSudoku(map, clues = [1,2,3,4,5,6,7,8,9]) {
  const gap = 0;
  const rowLocation = (map, row, clue) => {
    let location = null;
    for (const [col, cl] of map[row].entries())
        if (cl == clue) return null;
        else if (cl == gap && !location) location = { row: row, col: col };
    return location;
	};
	
  const colLocation = (map, col, clue) => {
    let location = null;
    for (const [row, entry] of map.entries())
        if (entry[col] == clue) return null;
        else if (entry[col] == gap && !location) location = { row: row, col: col };
    return location;
	};
	
  const locInSq = (map, location, clue) => {
    let len = Math.floor(Math.sqrt(map[0].length));
		let row = location.row - location.row % len;
		let col = location.col - location.col % len;
    let colLen = col + len;
    let l = null;
    for (let rowLen=row+len; row < rowLen; row++)
      for (let c=col; c < colLen; c++)
        if (map[row][c] == clue) return null;
        else if (map[row][c] == gap && !l) l = { row: row, col: c };
    return l;
	};
	
	const locIsEmpty = (map, location, clue) => {
		if (rowLocation(map, location.row, clue) && colLocation(map, location.col, clue) && locInSq(map, location, clue))
			return true;
		return false;
	};

	const locInMap = (map) => {
		const len = map.length;
		for (let r=0; r < len; r++)
			for (let c=0; c < len; c++)
				if (map[r][c] == gap)
					return { row: r, col: c };
		return null;
	};

	const solve = (map) => {
		let location = locInMap(map);
		if (!location)
			return null;
		for (const clue of clues) {
			if (locIsEmpty(map, location, clue)) {
				map[location.row][location.col] = clue;

				if (!solve(map))
					return null;
				map[location.row][location.col] = gap;
			}
		}
		return location;
	};
	
	if (solve(map))
		throw "No solution found!"
	return map;
}