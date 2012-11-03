define(["backbone","zelten/model/message","zelten/view/message","zelten/view/writestatus","bootstrap"],function(e,t,n,r){var i=e.View.extend({events:{"scroll-bottom":"loadOlderPosts","click .filter-post-type button":"filterByPostType","click a.loadOlderPosts":"loadOlderPosts"},initialize:function(e){this.entity=e.entity,this.postType="all",this.mentionedEntity=e.mentionedEntity,this.url=e.url,this.title=document.title,this.newMessagesCount=0,this.followers=e.followers,this.following=e.following,this.win=$(window),this.win.scroll(_.bind(this.scrollCheck,this)),setInterval(_.bind(this.checkNewMessages,this),15e3),this.collection.bind("add",_.bind(this.renderMessage,this))},filterByPostType:function(e){var t=$(e.currentTarget).attr("value");return t==this.postType?!1:(this.postType=t,this.collection.reset(),this.checkNewMessages(),!0)},checkNewMessages:function(){var e=this.collection.first(),t="";this.postType!="all"&&(t+="criteria[post_types]="+this.postType),e?t+="criteria[since_id]="+e.id+"&criteria[since_id_entity]="+e.get("entity"):this.$el.find(".stream-messages").addClass("loading"),this.mentionedEntity&&this.postType!="follower"&&(t+="&criteria[mentioned_entity]="+this.mentionedEntity),this.entity&&(t+="&criteria[entity]="+this.entity),$.ajax({url:this.url+(t.length>0?"?":"")+t,success:_.bind(this.checkNewMessagesSuccess,this)})},checkNewMessagesSuccess:function(e){var t=$(e).find(".stream-message").addClass("hidden-content"),n=this.$el.find(".stream-message").length==0;this.$el.find(".stream-messages").removeClass("loading");if(t.length==0)return;t.each(_.bind(this.addMessage,this));if(this.newMessagesCount==0)return;if(n){this.showNewMessages();return}if(this.newMessagesCount==1)var r="There is 1 new message.";else var r="There are "+this.newMessagesCount+" new messages.";this.$el.find(".stream-notifications").html('<div class="alert new-messages"><a href="#">'+r+"</a></div>"),this.$el.find(".new-messages").click(_.bind(this.showNewMessages,this)),document.title="("+this.newMessagesCount+") "+this.title},showNewMessages:function(){this.$el.find(".new-messages").remove(),this.$el.find(".stream-message").removeClass("hidden-content"),this.newMessagesCount=0,document.title=this.title},scrollCheck:function(){this.win.height()+this.win.scrollTop()==$(document).height()&&this.$el.trigger("scroll-bottom")},renderExistingMessages:function(){var e=this.$el.find(".stream-messages");e.find(".stream-message").each(_.bind(this.addMessage,this))},addMessage:function(e,n){var r=$(n),i=new t({id:r.data("message-id"),entity:r.data("entity"),published:r.data("published"),element:r}),s=this.$el.find(".stream-messages");s.children('*[data-message-id="'+i.id+'"]').length==0&&this.newMessagesCount++,this.collection.add(i)},renderMessage:function(e,t,r){var i=this.$el.find(".stream-messages"),s=new n({messages:this.collection,model:e,el:e.get("element")});s.render(),this.collection.on("reset",function(){s.remove()});if(i.children('*[data-message-id="'+e.id+'"]').length==1)return;r.index==0?i.prepend(s.$el):i.find(".stream-message").eq(r.index-1).after(s.$el)},renderWriteStatus:function(){this.postStatus=new r({collection:this.collection,el:this.$el.find(".stream-add-message-box .stream-message-add")}),this.postStatus.render()},render:function(){this.$el.find(".show-tooltip").tooltip({}),this.renderExistingMessages(),this.renderWriteStatus()},loadOlderPosts:function(){if(this.isLoadingOlderPosts)return!1;this.isLoadingOlderPosts=!0,this.loading=$('<div class="loading"></div>'),this.$el.find(".stream-messages").append(this.loading);var e="",t=this.collection.last();return this.postType!="all"&&(e+="criteria[post_types]="+this.postType),t&&(e+="&criteria[before_id]="+t.id+"&criteria[before_id_entity]="+t.get("entity")),this.mentionedEntity&&(e+="&criteria[mentioned_entity]="+this.mentionedEntity),this.entity&&(e+="&criteria[entity]="+this.entity),$.ajax({url:this.url+(e.length>0?"?":"")+e,success:_.bind(this.loadOlderPostsSuccess,this),error:_.bind(this.loadOlderPostsError,this)}),!1},loadOlderPostsError:function(){this.isLoadingOlderPosts=!1},loadOlderPostsSuccess:function(e){this.loading.remove();var t=$(e).find(".stream-messages"),n=this.$el.find(".stream-messages");t.find(".stream-message").each(_.bind(this.addMessage,this)),this.isLoadingOlderPosts=!1}});return i})