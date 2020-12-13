import Podium from './Podium';
import WoodenSpoon from "./WoodenSpoon";
import List from "./List";

const Wrapper = (props) => {
    return (
        <div className='container'>
            <Podium list={props.list}/>
            <List list={props.list}/>
            <WoodenSpoon list={props.list}/>
        </div>
    )
};

export default Wrapper;
