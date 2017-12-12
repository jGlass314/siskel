var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
      //we change this.like to the opposite
      // of what it currently is?

    this.set('like',!this.get('like'));

  }

});

var Movies = Backbone.Collection.extend({

  model: Movie, //so everything in this Movies Collection
                //is an instnace of Movie.

  initialize: function(movieArray) {
    // your code here
    // event listeners go here
    // set event handler for when comparator changes
    this.on('change', this.sort, this);

  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    this.comparator = field;
    this.sort();
  }

});

var AppView = Backbone.View.extend({
//the view for the whole app?
  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    //field becomes the target val of the event
    console.log('radio button clicked');
    var field = $(e.target).val();
    console.log('field set');
    this.collection.sortByField(field);
    console.log('sorted by: ', field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({
//the separate view for each individual movie instance
  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.model.on('change:like', this.render, this);
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    this.collection.on('sort', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
