import React from 'react';
import Pie from "./Pie";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list};
        this.filterList = this.filterList.bind(this);
    }

    filterList(e) {
        const selected = e.target.value;
        if (selected === '%') {
            // Show all pies.
            this.setState({list: this.props.list})
        } else {
            // Only show pies from the selected shop.
            const renderList = this.props.list.filter((pie) => pie['Shop'] === selected);
            this.setState({list: renderList})
        }
    }

    render() {
        const {list} = this.state;

        if (!list || list.length === 0) return <p>No pies, sorry</p>;


        let shops = [];
        this.props.list.forEach((pie) => {
            shops.push(pie.Shop);
        });

        // Only show unique shops.
        shops = shops.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        shops = shops.sort();

        return (
            <div className='list box'>
                <h2 className='list-head'>The full list</h2>
                <select name='shop' onChange={this.filterList}>
                    <option value='%'>Select a shop</option>
                    {shops.map((shop) => {
                        return (
                            <option key={shop}>{shop}</option>
                        )
                    })}
                </select>
                <ol className='list-inner'>
                    {list.map((pie) => {
                        return (
                            <Pie key={pie.Tweet} pie={pie}/>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

export default List;
