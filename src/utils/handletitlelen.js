export default function handleTitleLen(str) {
		if(str.length>6){
			var newstr=str.substring(0, 6)+'...';
			return newstr;
		}else{
			return str;
		}
		
	}
	