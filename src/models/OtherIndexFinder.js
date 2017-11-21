
const findOtherIndex = ({collection, value, propName, knownIndex}) => {
    let result = -1;
    for(let i = 0; i < collection.length; i++) {
        if(collection[i][propName] === value && i !== knownIndex) {
            return i;
        }
    }
    return result;
}

export default findOtherIndex;