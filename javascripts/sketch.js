$(function() {
  $.template("frame-description", '<div class="suppress_all frame-description">{{if tag_name}}<span class="tag_name">${tag_name}</span>{{/if}}{{if id}} <span class="id">${id}</span>{{/if}}{{if class}} <span class="class">${class}</span>{{/if}}</div>');
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
