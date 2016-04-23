import Ember from 'ember';

export default Ember.Controller.extend({
  songCreationStarted: false,
  
  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function(){
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),
  
  actions: {
    updateRating: function(params) {
      var song = params.item,
        rating = params.rating;
      
      if (song.get('rating') === rating){
        rating = 0;
      }
        
      song.set('rating', rating);
      song.save();
    },
    
    enableSongCreation: function(){
      this.set('songCreationStarted', true);
    }
  },
  
  title: '',
  
  isAddButtonDisabled: Ember.computed('title',function(){
    return Ember.isEmpty(this.get('title'));
  })
});
