var react = require('react');
var SortItem = require('./SortItem');

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

      // We form an array rearrange items
      _($(me.getDOMNode()).sortable("toArray")).each(function(item_id) {
        var id = parseInt(item_id.replace(/^item-/, ""))
        var nextItem = _(me.props.items).find(function(item) {
          return item.id == id;
        });
        items.push(nextItem);
      });

      // Call cancel, the elements changed places React.js
      $(me.getDOMNode()).sortable("cancel");

      // Call callback
      me.props.onReorder(items);
    };

    // Hook jQuery UI Sortable
    $(this.getDOMNode()).sortable({stop: stop});
  },

  render: function() {
    var me = this;
    var items = this.props.items.map(function(item, index) {
      return <SortItem key={index} item={item} index={index} />;
    });
    return <div>{items}</div>;
  }
});

module.exports = SortList;
