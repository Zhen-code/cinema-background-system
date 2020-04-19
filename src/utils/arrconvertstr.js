export default function arrcovertStr(arr) {
		var str="";
		for(var i=0;i<arr.length;i++){
			str=str+arr[i]+'/';
		}
		str=str.substring(0, str.length-1);
		return str;
	}
