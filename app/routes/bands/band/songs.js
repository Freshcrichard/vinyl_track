import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  
  actions: {
    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var title = controller.get('title');
      var song = Song.create({
        title: title,
        band: band
      });
      band.get('songs').pushObject(song);
      controller.set('title', '');
    },
    
    updateRating: function(params){
      var song = params.item,
        rating = params.rating;
      
      song.set('rating', rating);
    },
    
    didTransition: function(){
      var band = this.modelFor('bands.band');
      document.title = `${band.get('name')} Songs - Vinyl Track`;
    }
  },
  
  resetController: function(controller){
    controller.set('songCreationStarted', false);
  }
});
