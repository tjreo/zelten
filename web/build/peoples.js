var Zelten=Zelten||{};Zelten.Peoples=Backbone.Collection.extend({}),Zelten.Person=Backbone.Model.extend({}),Zelten.PeopleListView=Backbone.View.extend({initialize:function(e){this.url=e.url,this.loadPeople()},loadPeople:function(){this.$el.find(".people-list").addClass("loading"),$.ajax({url:this.url,success:_.bind(this.loadPeopleSucces,this)})},loadPeopleSucces:function(e){}})