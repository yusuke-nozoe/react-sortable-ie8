var Item = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.removeItem(this.props.item.id);
  },
  render: function() {
    return <li className="list-group-item" id={"item-" + this.props.item.id}>
      {this.props.index + 1}. {this.props.item.text}
      <div className="pull-right"><a href="#" onClick={this.handleClick}>X</a></div>
    </li>;
  }
});

var Sortable = React.createClass({
  componentDidMount: function() { this.componentDidUpdate(); },
  componentWillUnmount: function() { this.componentWillUpdate(); },

  componentWillUpdate: function() {
    $(this.getDOMNode()).sortable("destroy");
  },

  componentDidUpdate: function() {
    var me = this;

    var stop = function() {
      var items = [];

      // Формируем массив пересортированных элементов
      _($(me.getDOMNode()).sortable("toArray")).each(function(item_id) {
        var id = parseInt(item_id.replace(/^item-/, ""))
        var nextItem = _(me.props.items).find(function(item) {
          return item.id == id;
        });
        items.push(nextItem);
      });

      // Вызываем cancel, чтобы элементы местами поменял React.js
      $(me.getDOMNode()).sortable("cancel");

      // Вызываем колбек
      me.props.onReorder(items);
    };

    // Подключаем jQuery UI Sortable
    $(this.getDOMNode()).sortable({stop: stop});
  },

  render: function() {
    var me = this;
    var items = _(this.props.items).map(this.props.renderItem);
    return <div>{items}</div>;
  }
});

var List = React.createClass({
  render: function() {
    var me = this;
    var renderItem = function(item, index) {
      return <Item item={item} index={index} removeItem={me.props.removeItem} />;
    };
    return <ul className="list-group">
      <Sortable
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
