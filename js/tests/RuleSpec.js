define(['Rule','RuleResult'], function(Rule,RuleResult){
 var ruleR,ruleA;

  describe('Rules', function(){

      beforeEach(function(){

        ruleR = new Rule(/r/,1,true,"rh",
            function (len,idx,obj){
                if (len==idx){
                    obj.pattern=/r\b/;
                    obj.replacement = "rh";
                }else{
                    obj.pattern=/r/;
                    obj.replacement = "RR";
                }
            }
        );

        ruleA = new Rule(/a|A/,1,true,"hra");

    });

      describe('rule', function(){
          it('should replace last "r" by "rh" ', function(){


              var ruleResult = ruleR.execute('r',0,'');

              expect(ruleResult.transformed).toBe('rh');
          });

          it('should replace last "a" by "hra" ', function(){

              var ruleResult = ruleA.execute('a',1,'');

              expect(ruleResult.transformed).toBe('hra');
          });


          //it('should start NOT empty', function(){
          //    sessionStorage.setItem('playlist', JSON.stringify([new Song('my song')]));
          //    playlist = new Playlist();
          //    expect(playlist.playlist.length).toBe(1);
          //});
          //
          //it('should add a song to the array object', function(){
          //    playlist.addSong('your song')
          //    expect(playlist.playlist[0].title).toBe('your song');
          //});
          //
          //it('should updatePlaylist is called', function(){
          //    spyOn(playlist,"updatePlaylist");
          //    playlist.addSong("his song");
          //    expect(playlist.updatePlaylist).toHaveBeenCalled();
          //});
          //
          //it('should updatePlaylist is called when removing a song', function(){
          //    sessionStorage.setItem('playlist', JSON.stringify([new Song('my song 3')]));
          //    playlist = new Playlist();
          //    expect(playlist.playlist.length).toBe(1);
          //    spyOn(playlist,"updatePlaylist");
          //    playlist.removeSong(0);
          //    expect(playlist.updatePlaylist).toHaveBeenCalled();
          //});
          //
          //it("should the sessionStorage object matches the playlist's array", function(){
          //    playlist.addSong('your song')
          //    expect( JSON.stringify(playlist.playlist) ).toEqual(sessionStorage.getItem('playlist'));
          //});
      });

  });

});
