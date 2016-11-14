var _ = { compact: require('lodash/compact') }
var React = require('react')
var partial = require('./partial')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      dimensions: [],
      selectedDimensions: [],
      mandatoryDimensions: [],
      maxDimensions: null,
      onChange: function () {}
    }
  },

  render: function () {
    var self = this
    var selectedDimensions = this.props.selectedDimensions
    var mandatoryDimensions = this.props.mandatoryDimensions
    var nSelected = selectedDimensions.length
    
    var nonMandatory = this.props.dimensions.filter(function(e){
      return self.props.mandatoryDimensions.indexOf(e["title"]) == -1 ;
    });
    return (
      <div className="reactPivot-dimensions">
        {selectedDimensions.map(this.renderDimension)}
        {(this.props.maxDimensions == null || this.props.selectedDimensions.length < this.props.maxDimensions) &&
          <select value={''} onChange={partial(self.toggleDimension, nSelected)}>
            <option value={''}>Sub Dimension...</option>
            {nonMandatory.map(function(dimension) {
              return <option key={dimension.title}>{dimension.title}</option>
            })}
          </select>
        }
      </div>
    )
  },

  renderDimension: function(selectedDimension, i) {
    var self = this;
    
    var nonMandatory = this.props.dimensions.filter(function(e){
      return (self.props.mandatoryDimensions.indexOf(e["title"]) == -1) || selectedDimension == e["title"] ;
    });
    return (
        <select
          value={selectedDimension}
          onChange={partial(this.toggleDimension, i)}
          key={selectedDimension}
          disabled={!this.props.mandatoryDimensions.indexOf(selectedDimension)} >
          <option></option>
          {nonMandatory.map(function(dimension) {
            return (
              <option
                value={dimension.title}
                key={dimension.title} >
                {dimension.title}
              </option>
            )
          })}
        </select>
    )
  },

  toggleDimension: function (iDimension, evt) {
    // console.log(iDimension, evt);
    var dimension = evt.target.value
    var dimensions = this.props.selectedDimensions

    var curIdx = dimensions.indexOf(dimension)
    if (curIdx >= 0) dimensions[curIdx] = null
    dimensions[iDimension] = dimension

    var updatedDimensions = _.compact(dimensions)

    this.props.onChange(updatedDimensions)
  },
})
