var SortList = require('./components/SortList');

var items = [
  {
    id: 1,
    text: 'Item1'
  },
  {
    id: 2,
    text: 'Item2'
  },
  {
    id: 3,
    text: 'Item3'
  },
  {
    id: 4,
    text: 'Item4'
  }
];

var App = React.createClass({
  getInitialState: function() {
    return {
      next_id: 1,
      items: items
    };
  },
  onReorder: function(items) {
    this.setState({items: items});
  },
  render: function() {
    return (
      <div>
        <ul className="list-group">
          <SortList
            items={this.state.items}
            onReorder={this.onReorder}
          />
        </ul>
      </div>
    );
  }
});

React.initializeTouchEvents(true);
React.render(<App />, document.getElementById('recipe'));
