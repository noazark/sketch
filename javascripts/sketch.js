$(function() {
  $.template("frame-description", '<div class="suppress_all frame-description">{{html $item.html}}</div>');
  $.template("valid",
    '{{wrap "frame-description"}}\
      {{if tag_name}}\
        {{tmpl "tag_name"}}\
      {{/if}}\
      {{if id}}\
        $nbsp;{{tmpl "id"}}\
      {{/if}}\
      {{if class}}\
        $nbsp;{{tmpl "class"}}\
      {{/if}}\
    {{/wrap}}');
  $.template("warning",
    '{{wrap "frame-description"}}\
      <span>warning</span>\
    {{/wrap}}');
  $.template("tag_name", '<span class="tag_name">${tag_name}</span>');
  $.template("id", '<span class="id">${id}</span>');
  $.template("class", '<span class="class">${classes}</span>');
  
  var options = {
    ignore: '.suppress, .suppress_all, .suppress_all *, a',
    warn: 'div, span'
  }

  $('body *').not(options.ignore).each(function(){
    var
      description = {
        tag_name: this.tagName.toLowerCase(),
        id: $(this).attr('id'),
        classes: $(this).attr('class')
      };
    
    if($.inArray(description.tag_name, options.warn.split(', ')) != -1 && !description.id && !description.classes) {
      content = $.tmpl("warning");
    } else {
      content = $.tmpl("valid",description);
    }
    
    $(this).prepend(content);
  });
});
