var react = require('react');

var SortList = React.createClass({
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

module.exports = SortList;
