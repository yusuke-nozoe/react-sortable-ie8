var SortItem = require('./components/SortItem');
var SortList = require('./components/SortList');

var List = React.createClass({
  render: function() {
    var me = this;
    var renderItem = function(item, index) {
      return <SortItem item={item} index={index} removeItem={me.props.removeItem} />;
    };
    return <ul className="list-group">
      <SortList
        renderItem={renderItem}
        items={this.props.items}
        onReorder={this.props.onReorder}
      />
    </ul>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      next_id: 1,
      items: []
    };
  },
  randomElem: function(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  },
  genItem: function() {
    var actions = ["Добавить", "Порезать", "Вымыть", "Размельчить"];
    var products = ["Картофель", "Лучок", "Колбасу", "Помидор"];
    return this.randomElem(actions) + " " + this.randomElem(products);
  },
  addItem: function(e) {
    e.preventDefault();
    var newItems = this.state.items.concat([{id: this.state.next_id, text: this.genItem()}]);
    this.setState({items: newItems, next_id: this.state.next_id + 1});
  },
  removeItem: function(id) {
    var pred = function(item) {
      return item.id != id;
    };
    var newItems = this.state.items.filter(pred);
    this.setState({items: newItems});
  },
  onReorder: function(items) {
    this.setState({items: items});
  },
  render: function() {
    var bonAppetit = <div><b>Приятного аппетита!</b></div>;
    return <div>
      <List items={this.state.items} removeItem={this.removeItem} onReorder={this.onReorder} />
      <div className="pull-right"><a href="#" onClick={this.addItem}>Добавить шаг</a></div>
      {this.state.items.length >= 2 ? bonAppetit : null}
    </div>;
  }
});

React.initializeTouchEvents(true);
React.render(<App />, document.getElementById('recipe'));
