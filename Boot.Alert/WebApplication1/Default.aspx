<%@ Page Title="主页" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication1._Default" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h3>前言:</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是一个伟大的插件，虽然300行代码不到，而且bug还很多。
    <br />
    <br />
    <h3>下面是我们的建议:</h3>
    <ol class="round">
        <li class="one">
            <h5>开始使用</h5>
            点击最顶上的Link便可进入插件的开发和调试页面。
            这里目前只提供最简单的实现，甚至是有些不合理的设计，你可以扩展自己的函数，增加你认为炫酷的弹窗样式，尽可能使它强大、实用，总之一句话，Boot.Alert的前途就靠你了。
        </li>
        <li class="two">
            <h5>开发者互动</h5>
            基于这个插件，如果你想到什么好的姿势，非常期待你能与我分享。
        </li>
        <li class="three">
            <h5>关于Boot.Alert</h5>
            Boot.Alert的前身是我在网上下的一个JQuery.confirm.js，好屌的样子，打开一看，才150来行代码，而且在我的系统上用不怎么好使，尤其是当页面里含有iframe的时候。于是我就一通乱改，成了现在这样子。这虽然只是基于Bootstrap样式很小的一个插件，但是简单的东西不一定就注定平凡，在走向卓越之前它仍然有很大的改良空间。所以...看你的了。
        </li>
    </ol>
</asp:Content>
