use dev_printer_manager;

insert into color_levels (printer_id, color, level)
values ( (select printer_id
          from printers
          where ip_address = "duh.177.200.37"),
        "magenta",
        50);