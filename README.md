
#navTop
    span.nav.link
        img(src='https://media.discordapp.net/attachments/804066817567883294/805732470691594250/PngItem_2986122.png?width=457&height=457')
    span.navtag.keep
        a(href="/")
            span.navtext.keep Toyota
        include arrow.pug
        if (bot && !site_key) 
            a(href=`/bots/${bot.botid}`)
            include arrow.pug
            a(href=`/api/embed/${bot.botid}` target="_blank")
        if ((req.baseUrl == "/user" || req.baseUrl == "/me") && userProfile)
            a(href=`/user/${userProfile.id}`)
                span.navtext #{userProfile.username}
        if (req.baseUrl == "/tag")
            a(href=`/tag/${tag}`)
                span.navtext.capitalise #{tag}
    a#searcher.navtag.search(href='/bots/search/')
        #search.navtext
            i.fas.fa-search
            |  Search
    span.dropdown
        if (req.user)
            a#login.navtag.keep(href='/login') #{req.user.username}##{req.user.discriminator} 
            span.dd-content
                a(href='/join' target='_blank') Join Server 
                 i.fab.fa-discord
                br
                a(href='/add') Add bot 
                i.fas.fa-plus
                br
                a(href='bots/757746671861104780') Top Bot 
                i.fas.fa-award
                br
                a(href='/about') About 
                i.fas.fa-address-book
                if (req.user.staff)
                    br
                    a(href='/admin') Dashboard 
                    i.fas.fa-tools
                br
                a(href='/logout') Logout 
                  i.fas.fa-sign-out-alt
        else
            a#login.navtag.keep(href='/login') Login 
             i.fas.fa-sign-in-alt