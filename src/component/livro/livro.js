console.log("running....");
function init() {
    var admin = new CustomerAdmin(customers);
    ko.applyBindings(admin, $('.container')[0]);
};

function Customer(data) {
    ko.mapping.fromJS(data, {
        'services': {
            create: function(options) {
                return new Service(options.data);
            }
        }
    }, this);
    this.edit = ko.observable(false);
   
}

function Service(data) {
    ko.mapping.fromJS(data, {}, this);
    this.edit = ko.observable(false);
    this.startEdit = function(data, event) {
        if(data.stopping) {
            clearTimeout(data.stopping);
        }
        data.edit(true);

        var element = event.target;
        switch(element.tagName) {
            case "SPAN":
                $(element).next().focus();
                break;
            case "INPUT":
                $(element).focus();
                break;
        }
    };
    this.stopEdit = function(data) {
        data.stopping = setTimeout(function() {
            data.edit(false);
        }, 200);
    }
}

function CustomerAdmin(customers) {
    /*for(var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        customer.name = ko.observable(customer.name);
        customer.emailAddress = ko.observable(customer.emailAddress);
        customer.age = ko.observable(customer.age);
        customer.bio = ko.observable(customer.bio);
        customer.edit = ko.observable(false);
    }
    this.customers = ko.observableArray(customers);*/
    this.customers = ko.mapping.fromJS(customers, {
        create: function(options) {
            return new Customer(options.data);
        }
    });
    
    this.selected = ko.observable(false);
    
    this.setSelected = function(customer) {
        this.selected(customer);
    };
    
    this.add = function() {
        console.log(this);
        var customer = {
            name: ko.observable(''),
            emailAddress: ko.observable(''),
            age: ko.observable(0),
            bio: ko.observable('new customer'),
            edit: ko.observable(true),
            services: ko.observableArray()
        };
        this.customers.push(customer);

    };

    this.delete = function(index) {
        this.customers.splice(index(),1);
        this.selected(false);
    };
    
    this.toggleEdit = function(customer, edit) {
        customer.edit(edit);
    }
    this.save = function() {
        console.log(ko.toJSON(this));
        toastr["success"]("Data saved successfully")
    }
};

ko.components.register('service-credits', {
    template: { element: 'service-credits-template' },
    viewModel: function(params) {
        
       this.customer = params.customer;
       this.serviceNames = ['Website Templates', 'Stock Images', 'Sound Tracks', 'Screen Savers', 'Wordpress Themes'];
        this.addService = function() {
            console.log('Add Service');
            if(!this.customer().services) {
                this.customer().services = ko.observableArray();
            }
            this.customer().services.push(new Service({
                "name": "",
                "credit": "1"
            }));
        };
    }
});

let customers = [{
    "name": "John Smith",
    "emailAddress": "john.smith@example.com",
    "age": 30,
    "bio": "Lorem ipsum dolor sit amet, posse perpetua cum ut, duo te adhuc integre complectitur. Mea eu senserit molestiae. In vis vidisse dissentias. Harum petentium constituto no his, ei cum eleifend delicatissimi, indoctum aliquando cu quo. Everti placerat senserit per ea, in vide errem vel.",
    "services": [{
        "name": "Website Templates",
        "credit": "10"
    }, {
        "name": "Stock Images",
        "credit": "5"
    }, {
        "name": "Sound Tracks",
        "credit": "1"
    }]
},{
    "name": "Joe Bloggs",
    "emailAddress": "bjoe@gmail.com",
    "age": 20,
    "bio": "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups.",
    "services": []
},{
    "name": "Jane Doe",
    "emailAddress": "jane@hotmail.com",
    "age": 40,
    "bio": "Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes). Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "services": []
}];

init();