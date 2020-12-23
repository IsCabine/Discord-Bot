module.exports = (min, max, distance = 1) => 
	min + distance * Math.floor(Math.random() * (max - min + 1) / distance);