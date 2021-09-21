'use strict';

// **
// * class Folders - масив об'єктів (name, url) і підмасивів
class Folders {
	// **
	// * constructor
	// *@param - count - задає рівень вкладеності підмасивів (по замовчуванню - 5)
	// * folders - масив
	constructor(count = 5) {
		this.count = count;
		this.folders = [];
		this.createArray();
	}
	// **
	// * створює масив об'єктів і підмасивів
	createArray() {
		// for(let i = 1; i < 10; i++) {
		for(let i = 1; i < 8; i++) {
			let name = `${i}`;
			let obj = {
				name: `name ${name}`,
				url: `url ${name}`
			};
			this.folders.push(obj);
			let sub = this.createSubArray(name, this.count);
			if(sub.length != 0) {
				this.folders.push(sub);
			}
		}
	}
	// **
	// * створює підмасивів (рекурсивно)
	// * @param str - шаблон для name
	// * @param num - рівень вкладеності підмасивів, (зменьшується на 1)
	// * limit - генерує кількість елементів в списку (2-8)
	// * @return - масив об'єктів і підмасивів
	createSubArray(str, num) {
		let limit;
		do{
			limit = Math.round(Math.random() * 8);
		} while(num === this.count && limit < 3);
		let subarray = [];
		num--;
		for(let i = 1; i < limit; i++) {
			let name1 = `${str}.${i}`;
			let obj1 = {
				name: `name ${name1}`,
				url: `url ${name1}`
			};
			subarray.push(obj1);
			if(num) {
				let subsub = this.createSubArray(name1, num);
				if(subsub.length > 1) {
					subarray.push(subsub);
				}
			}
		}
		return subarray;
	}
}
