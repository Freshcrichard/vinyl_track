import { test } from 'qunit';
import moduleForAcceptance from 'vinyl_track/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

moduleForAcceptance('Acceptance | bands');

var server;

test('List bands', function(assert) {
  server = new Pretender(function(){
    httpStubs.stubBands(this, [

      {
          id: 1,
          type: 'bands',
          attributes: {
            name: 'Radiohead'
          }
        },
        {
          id: 2,
          type: 'bands',
          attributes: {
            name: 'Long Distance Calling'
          }
        },

      ]);
    });

  visit('/bands');

  andThen(function() {
    assertLength(assert, '.band-link', 2, 'All links are rendered');
    assertLength(assert, '.band-link:contains("Radiohead")', 1, 'First band link contains the band name');
    assertLength(assert, '.band-link:contains("Long Distance Calling")', 1, 'The other band link contains the band name');
  });
});

test('Create a new band', function(assert){
  server = new Pretender(function(){
    httpStubs.stubBands(this, [

      {
        id: 1,
        type: 'bands',
        attributes: {
          name: 'Radiohead'
        }
      }

    ]);

    httpStubs.stubCreateBand(this, 2);
  });
  
  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');
  
  andThen(function(){
    assertLength(assert, '.band-link', 2, 'All band links are rendered');
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', 'Created band appears at the end of the list');
    assertElement(assert, '.nav a.active:contains("Songs")', 'The Songs tab is active');
  });
});

test('Create a new song in two steps', function(assert){
  server = new Pretender(function(){
    httpStubs.stubBands(this, [

      {
        id: 1,
        type: 'bands',
        attributes: {
          name: 'Radiohead'
        }
      }

    ]);
    
    httpStubs.stubSongs(this, 1, []);
    
    httpStubs.stubCreateSong(this, 1);    
  });
  
  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  submit('.new-song-form');
  
  andThen(function() {
    assertElement(assert, '.songs .song:contains("Killer Cars")', "Creates the song and displays it in the list");
  });
});