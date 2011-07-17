$(function() {
  $.template("frame-description",
  '<div class="suppress_all frame-description"><span class="tag_name">{{if tag_name}}${tag_name}{{/if}}</span><span class="id">{{if id}}${id}{{/if}}</span><span class="class">{{if class}}${class}{{/if}}</span></div>');
  $.template("_id", '<span class="id">{{if id}}${id}{{/if}}</span>');
  $.template("_class", '<span class="class">{{if class}}${class}{{/if}}</span>');
  
  var options = {
    ignore: '.suppress, .suppress_all, a, div'
  }
  $('body *').not(options.ignore).each(function(){
    var
      description = {
        tag_name: this.tagName.toLowerCase(),
        id: $(this).attr('id'),
        class: $(this).attr('class')
      },
      content = $.tmpl("frame-description",description);
      
    $(this).prepend(content);
  });
});
