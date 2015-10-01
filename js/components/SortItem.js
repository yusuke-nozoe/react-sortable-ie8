var react = require('react');

var SortItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.removeItem(this.props.item.id);
  },
  render: function() {
    return (
      <li className="list-group-item" id={"item-" + this.props.item.id}>
        {this.props.index + 1}. {this.props.item.text}
        <div className="pull-right">
          <a href="#" onClick={this.handleClick}>X</a>
        </div>
      </li>
    );
  }
});

module.exports = SortItem;
