define(["jquery","backbone","bootstrap"],function(){var e=Backbone.View.extend({render:function(){this.$el.find(".avatar").popover({title:$("#profile-dialog").data("name"),content:$("#profile-dialog").html(),placement:"left"})}});return e})