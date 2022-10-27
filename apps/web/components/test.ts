export const jsonText = `{
    "job" : {
      "content" : [ { //11
            // test111
        "reader" : {
          // test
          "parameter" : {
                "password" : "******", //111212
            "port" : 3306,
            "cat" : "insert,update,delete",
            "host" : "172.16.23.194",
            "jdbcUrl" : "jdbc:mysql://172.16.23.194:3306/ceshi",
            "start" : { },
            "pavingData" : true,
            "table" : [ "ddl_change_qianyi_cdc_oracle" ],
            "username" : "root"
          },
          "name" : "binlogreader"
        },
        "writer" : {
          "parameter" : {
            "schema" : "ceshi",
            "fileName" : "pt",
            "writeMode" : "append",
            "maxFileSize" : 10485760,
            "fieldDelimiter" : "\u0001",
            "partitionType" : "DAY",
            "path" : "",
            "analyticalRules" : "stream_test",
            "tablesColumn" : "{\"ddl_change_qianyi_cdc_oracle\":[{\"part\":false,\"comment\":\"DDL操作对应的数据库\",\"type\":\"VARCHAR\",\"key\":\"before_database_name\"},{\"comment\":\"DDL操作对应的数据库\",\"type\":\"VARCHAR\",\"key\":\"after_database_name\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作对应的schema\",\"type\":\"VARCHAR\",\"key\":\"before_schema_name\"},{\"comment\":\"DDL操作对应的schema\",\"type\":\"VARCHAR\",\"key\":\"after_schema_name\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作对应的表名\",\"type\":\"VARCHAR\",\"key\":\"before_table_name\"},{\"comment\":\"DDL操作对应的表名\",\"type\":\"VARCHAR\",\"key\":\"after_table_name\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作对应的类型，如：alter、create等\",\"type\":\"VARCHAR\",\"key\":\"before_operation\"},{\"comment\":\"DDL操作对应的类型，如：alter、create等\",\"type\":\"VARCHAR\",\"key\":\"after_operation\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作在binlog日志中的位点\",\"type\":\"VARCHAR\",\"key\":\"before_lsn\"},{\"comment\":\"DDL操作在binlog日志中的位点\",\"type\":\"VARCHAR\",\"key\":\"after_lsn\",\"part\":false},{\"part\":false,\"comment\":\"dml/ddl可能会被拆成多条语句，代表此语句是拆分的序列号\",\"type\":\"INT\",\"key\":\"before_lsn_sequence\"},{\"comment\":\"dml/ddl可能会被拆成多条语句，代表此语句是拆分的序列号\",\"type\":\"INT\",\"key\":\"after_lsn_sequence\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作对应的SQL语句\",\"type\":\"TEXT\",\"key\":\"before_content\"},{\"comment\":\"DDL操作对应的SQL语句\",\"type\":\"TEXT\",\"key\":\"after_content\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作转换后SQL语句\",\"type\":\"TEXT\",\"key\":\"before_convented_content\"},{\"comment\":\"DDL操作转换后SQL语句\",\"type\":\"TEXT\",\"key\":\"after_convented_content\",\"part\":false},{\"part\":false,\"comment\":\"数据最近一次更新时间\",\"type\":\"TIMESTAMP\",\"key\":\"before_update_time\"},{\"comment\":\"数据最近一次更新时间\",\"type\":\"TIMESTAMP\",\"key\":\"after_update_time\",\"part\":false},{\"part\":false,\"comment\":\"DDL操作对应的状态，0表示未执行，-1执行失败的DDL, 2表示已执行, -2 ddl自动转换失败\",\"type\":\"SMALLINT\",\"key\":\"before_status\"},{\"comment\":\"DDL操作对应的状态，0表示未执行，-1执行失败的DDL, 2表示已执行, -2 ddl自动转换失败\",\"type\":\"SMALLINT\",\"key\":\"after_status\",\"part\":false},{\"part\":false,\"comment\":\"逻辑删除，0未删除，1已删除\",\"type\":\"TINYINT\",\"key\":\"before_is_delete\"},{\"comment\":\"逻辑删除，0未删除，1已删除\",\"type\":\"TINYINT\",\"key\":\"after_is_delete\",\"part\":false},{\"comment\":\"\",\"type\":\"varchar\",\"key\":\"type\"},{\"comment\":\"\",\"type\":\"varchar\",\"key\":\"schema\"},{\"comment\":\"\",\"type\":\"varchar\",\"key\":\"table\"},{\"comment\":\"\",\"type\":\"bigint\",\"key\":\"ts\"}]}",
            "partition" : "pt",
            "hadoopConfig" : {
              "principal" : "hive/master@DTSTACK.COM",
              "fs.defaultFS" : "hdfs://master:8020",
              "hadoop.security.authentication" : "Kerberos",
              "remoteDir" : "/data/sftp/DsCenter_22857",
              "hadoop.security.authorization" : true,
              "principalFile" : "hive.keytab",
              "sftpConf" : {
                "maxWaitMillis" : "3600000",
                "minIdle" : "16",
                "auth" : "1",
                "isUsePool" : "false",
                "timeout" : "0",
                "path" : "/data/sftp",
                "password" : "******",
                "maxIdle" : "16",
                "port" : "22",
                "maxTotal" : "16",
                "host" : "172.16.82.142",
                "fileTimeout" : "300000",
                "username" : "root"
              },
              "fs.hdfs.impl.disable.cache" : "true",
              "kerberosDir" : "DsCenter_22857",
              "java.security.krb5.conf" : "krb5.conf",
              "fs.hdfs.impl" : "org.apache.hadoop.hdfs.DistributedFileSystem"
            },
            "jdbcUrl" : "jdbc:hive2://172.16.100.208:10000/jinyucdh620;principal=hive/master@DTSTACK.COM",
            "defaultFS" : "hdfs://master:8020",
            "fileType" : "orc",
            "charsetName" : "utf-8"
          },
          "name" : "hivewriter",
          "type" : 7
        }
      } ],
      "setting" : {
        "restore" : {
          "isRestore" : true,
          "isStream" : true
        },
        "errorLimit" : { },
        "speed" : {
          "readerChannel" : 1,
          "writerChannel" : 1,
          "bytes" : -1048576,
          "channel" : 1
        }
      }
    }
  }`;
