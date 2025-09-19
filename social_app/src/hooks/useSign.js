import {useSelector, useDispatch} from 'react-redux';

function useSign(){

    let value = useSelector((state)=> state.signup.username);
    let dispatch = useDispatch();

    return  {value, dispatch};
}

export default useSign;